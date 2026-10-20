import {
  STATIC_RESOURCE_DETAILS,
  STATIC_RESOURCE_LIST,
} from '../data/resources.static';

export interface ResourceRepository {
  getList(): typeof STATIC_RESOURCE_LIST;
  getById(id: string): (typeof STATIC_RESOURCE_DETAILS)[number] | undefined;
}

export const staticResourceRepository: ResourceRepository = {
  getList: () => STATIC_RESOURCE_LIST,
  getById: (id) =>
    STATIC_RESOURCE_DETAILS.find((resource) => resource.id === id),
};
