export interface ITour {
  name: string;
  type: string;
  regionId: number;
  agencyId?: number;
  price?: number | undefined;
  unit?: string | undefined;
  note?: string | undefined;
}
export interface ITourResponse {
	id: number;
	name: string;
	type: number;
	region: string;
	agency?: string | undefined;
	price?: number | undefined;
	unit?: string | undefined;
	note?: string | undefined;
  }
export interface IPilot {
	id: string; // Primary key
	name: string,
	surname: string,
	status: Boolean;
	dateOfBirth: string; // Assuming date format: YYYY-MM-DD
	gender: string;
	nationality: string;
	contactInformation: {
	  phoneNumber: string;
	  emailAddress: string;
	  emergencyContactFullName: string;
	  emergencyContactPhone: string;
	  emergencyContactFullRelationship: string;
	};
	address?: string;
	licensingAndCertifications: {
	  paraglidingLicenseType: string;
	  issuingAuthority: string;
	  licenseNumber: string;
	  licenseExpirationDate: string; // Assuming date format: YYYY-MM-DD
	};
	totalFlightHours: number;
	equipmentInventory?: string[]; // Owned or used equipment details
	notes?: string; // Any additional notes or information
  }

