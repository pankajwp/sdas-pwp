export type GraphData = {
  displayName: string;
  userPrincipalName: string;
  mail: string;
  businessPhones: string[];
  officeLocation: string;
  jobTitle: string;
};

export type ArchivedData = {
  application_folder: string;
  completed_at: string;
  legal_hold: 'Yes' | 'No';
  type: 'Structured' | 'Unstructured';
  gxp: 'Gxp' | 'Gxp Medium' | 'Gxp High' | 'Non-Gxp';
};
