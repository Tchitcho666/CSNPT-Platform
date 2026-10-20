import { STATIC_FORMATIONS } from '../data/formations.static';

export interface FormationRepository {
  getAll(): typeof STATIC_FORMATIONS;
}

export const staticFormationRepository: FormationRepository = {
  getAll: () => STATIC_FORMATIONS,
};
