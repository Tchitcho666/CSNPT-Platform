import { staticResourceRepository } from '../repositories/resource.repository';

export type {
  ListedResource,
  ResourceDetail,
  ResourceLanguage,
  ResourceType,
} from '../data/resources.static';

export const getResourceList = () => staticResourceRepository.getList();
export const getResourceDetail = (id: string) =>
  staticResourceRepository.getById(id);
