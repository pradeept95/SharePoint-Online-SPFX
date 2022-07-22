import { ISiteSettingProps } from "../../../common/settings/SiteSettingsProps";

export interface IExamplesProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  settings : ISiteSettingProps
}
