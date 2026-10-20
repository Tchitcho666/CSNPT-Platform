import { I18N_DATA, PLANS } from '../data';

export interface InstitutionalContentRepository {
  getHomepageCopy(): typeof I18N_DATA;
  getMembershipPlans(): typeof PLANS;
}

export const staticInstitutionalContentRepository: InstitutionalContentRepository = {
  getHomepageCopy: () => I18N_DATA,
  getMembershipPlans: () => PLANS,
};
