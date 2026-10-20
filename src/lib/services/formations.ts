import { staticFormationRepository } from '../repositories/formation.repository';

export type {
  Formation,
  FormationStatus,
} from '../data/formations.static';

export const getFormations = () => staticFormationRepository.getAll();
