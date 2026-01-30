export interface AppSettings {
    portalName: string;
    allowAnonymous: boolean;
    maintenanceMode: boolean;
    slaDays: number;
    primaryColor: string;
}

let settings: AppSettings = {
    portalName: 'Ouvidoria Participa DF',
    allowAnonymous: true,
    maintenanceMode: false,
    slaDays: 20,
    primaryColor: '#004A99' // GDF Blue
};

export const settingsStore = {
    getSettings: () => ({ ...settings }),
    updateSettings: (newSettings: Partial<AppSettings>) => {
        settings = { ...settings, ...newSettings };
        return settings;
    }
};
