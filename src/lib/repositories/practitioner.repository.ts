import 'server-only';

import { PRACTITIONERS } from '../data';
import type { PractitionerEntity } from '../types';

export interface PractitionerRepository {
  getAll(): PractitionerEntity[];
}

export const staticPractitionerRepository: PractitionerRepository = {
  getAll: () => PRACTITIONERS,
};
