export interface SettingsTypes {
  cities: Array<SettingsItemTypes>;
}

export interface SettingsItemTypes {
  id: number;
  name: string;
  country: string;
}
