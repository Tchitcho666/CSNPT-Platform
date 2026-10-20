import { staticInstitutionalContentRepository } from '../repositories/institutional-content.repository';

export const getHomepageCopy = () =>
  staticInstitutionalContentRepository.getHomepageCopy();
export const getMembershipPlans = () =>
  staticInstitutionalContentRepository.getMembershipPlans();
