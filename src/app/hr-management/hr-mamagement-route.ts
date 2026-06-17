import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { RequisitionComponent } from "./requisition/requisition.component";
import { JobPostingComponent } from "./job-posting/job-posting.component";
import { CandidatePipelineComponent } from "./candidate-pipeline/candidate-pipeline.component";
import { InterviewManagementComponent } from "./interview-management/interview-management.component";
import { CandidateDocumentsComponent } from "./candidate-documents/candidate-documents.component";
import { OfferManagementComponent } from "./offer-management/offer-management.component";



import { ComingSoonComponent } from "../shared/coming-soon/coming-soon.component";

export const routes: Routes = [
      {
        path: "requisition",
        component: RequisitionComponent,
      },
      {
        path: "jobs",
        component: JobPostingComponent,
      },
      {
        path: "candidate-pipeline",
        component: CandidatePipelineComponent,
      },
      {
        path: "interviews",
        component: InterviewManagementComponent,
      },
      {
        path: "documents",
        component: CandidateDocumentsComponent,
      },
      {
        path: "offers",
        component: OfferManagementComponent,
      },
      {
        path: "reports",
        component: ComingSoonComponent,
      },
      {
        path: "timeline",
        component: ComingSoonComponent,
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HrRoutingModule {}