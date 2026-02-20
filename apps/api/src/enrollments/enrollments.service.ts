import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentsCadenceDto } from './dto/update-enrollments-cadence.dto';
import { CadenceStep, Enrollment } from 'shared';
import { randomUUID } from 'crypto';
import { CadencesService } from 'src/cadences/cadences.service';
import { TemporalService } from 'src/temporal/temporal.service';
import { WorkflowStatus } from 'shared';

@Injectable()
export class EnrollmentsService {
  private enrollments = new Map<string, Enrollment>();

  constructor(
    private readonly cadencesService: CadencesService,
    private readonly temporalService: TemporalService,
  ) {}

  async createEnrollment(dto: CreateEnrollmentDto) {
    const cadence = this.cadencesService.getCadence(dto.cadenceId);

    if (!cadence) {
      throw new NotFoundException(`Cadence ${dto.cadenceId} not found`);
    }

    const id = randomUUID();
    const workflowId = `enrollment-${id}`;

    const enrollment: Enrollment = {
      id,
      cadenceId: dto.cadenceId,
      contactEmail: dto.contactEmail,
      workflowId,
      currentStepIndex: 0,
      stepsVersion: 1,
      steps: cadence.steps,
      status: WorkflowStatus.RUNNING,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.enrollments.set(id, enrollment);

    try {
      await this.temporalService.startCadenceWorkflow(
        workflowId,
        dto.cadenceId,
        dto.contactEmail,
        cadence.steps as CadenceStep[],
      );
      console.log(`Started workflow for enrollment ${id}`);
    } catch (error) {
      console.error('Failed to start workflow:', error);
      enrollment.status = WorkflowStatus.FAILED;
      this.enrollments.set(id, enrollment);
    }

    return enrollment;
  }

  async getEnrollment(id: string) {
    const enrollment = this.enrollments.get(id);
    if (!enrollment) {
      throw new NotFoundException(`Enrollment ${id} not found`);
    }

    if (enrollment.status === WorkflowStatus.RUNNING) {
      const workflowState = await this.temporalService.getWorkflowState(
        enrollment.workflowId,
      );

      if (workflowState) {
        enrollment.currentStepIndex = workflowState.currentStepIndex;
        enrollment.stepsVersion = workflowState.stepsVersion;
        enrollment.status = workflowState.status;
        enrollment.updatedAt = new Date();
        this.enrollments.set(id, enrollment);
      }
    }

    return enrollment;
  }

  async updateCadenceInFlight(id: string, dto: UpdateEnrollmentsCadenceDto) {
    const enrollment = await this.getEnrollment(id);

    await this.temporalService.updateCadenceInWorkflow(
      enrollment.workflowId,
      dto.steps as CadenceStep[],
    );

    if (dto.steps.length <= enrollment.currentStepIndex) {
      enrollment.status = WorkflowStatus.COMPLETED;
    }

    enrollment.stepsVersion++;
    enrollment.updatedAt = new Date();
    this.enrollments.set(id, enrollment);

    return enrollment;
  }
}
