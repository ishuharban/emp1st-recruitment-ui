import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AccessControlComponent } from "./access-control/access-control.component";
import { RecruitmentSettingsComponent } from "./recruitment-settings/recruitment-settings.component";

import { ComingSoonComponent } from "../shared/coming-soon/coming-soon.component";
import { PipelineSetupComponent } from "./pipeline-setup/pipeline-setup.component";
import { CandidateFormBuilderComponent } from "./candidate-form-builder/candidate-form-builder.component";
import { MatchAnalysisConfigurationComponent } from "./match-analysis-configuration/match-analysis-configuration.component";
import { EmailNotificationSetupComponent } from "./email-notification-setup/email-notification-setup.component";
import { InterviewTemplateConfigurationComponent } from "./interview-template-configuration/interview-template-configuration.component";
import { UserAccessManagementComponent } from "./user-access-management/user-access-management.component";
import { AutomationRulesComponent } from "./automation-rules/automation-rules.component";

export const routes: Routes = [
    {
       path: "access-control",
       component: AccessControlComponent,
    },
    {
       path: "settings",
       component: RecruitmentSettingsComponent,
    },
    { path: "pipeline-setup", component: PipelineSetupComponent },
    { path: "candidate-form", component: CandidateFormBuilderComponent },
    { path: "match-analysis", component: MatchAnalysisConfigurationComponent },
    { path: "email-templates", component: EmailNotificationSetupComponent },
    { path: "interview-templates", component: InterviewTemplateConfigurationComponent },
    { path: "user-invitation", component: UserAccessManagementComponent },
    { path: "workflow", component: ComingSoonComponent },
    { path: "integrations", component: ComingSoonComponent },
    { path: "automation-rules", component: AutomationRulesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class settingsRoutingModule {}