import {
    ActionsApi,
    ApplicationsApi,
    ClientsApi,
    GroupInfoApi,
    GroupPositionApi,
    GroupsApi,
    PersonalApi,
    RolesApi,
    TitleLevelsApi,
    UsersApi,
} from '@sdk/identity-next/api';
import { getAxiosInstance } from '@services/auth';
import { AppConfig } from '@utils/config';

export const ActionIdentityApi = () => {
    return new ActionsApi(undefined, AppConfig.ApiIdentity, getAxiosInstance());
};

export const ApplicationIdentityApi = () => {
    return new ApplicationsApi(undefined, AppConfig.ApiIdentity, getAxiosInstance());
};

export const ClientIdentityApi = () => {
    return new ClientsApi(undefined, AppConfig.ApiIdentity, getAxiosInstance());
};

export const GroupInfoIdentityApi = () => {
    return new GroupInfoApi(undefined, AppConfig.ApiIdentity, getAxiosInstance());
};

export const GroupPositionIdentityApi = () => {
    return new GroupPositionApi(undefined, AppConfig.ApiIdentity, getAxiosInstance());
};

export const GroupsIdentityApi = () => {
    return new GroupsApi(undefined, AppConfig.ApiIdentity, getAxiosInstance());
};

export const PersonalIdentityApi = () => {
    return new PersonalApi(undefined, AppConfig.ApiIdentity, getAxiosInstance());
};

export const RolesIdentityApi = () => {
    return new RolesApi(undefined, AppConfig.ApiIdentity, getAxiosInstance());
};

export const UserIdentityApi = () => {
    return new UsersApi(undefined, AppConfig.ApiIdentity, getAxiosInstance());
};

export const TitleLevelsIdentityApi = () => {
    return new TitleLevelsApi(undefined, AppConfig.ApiIdentity, getAxiosInstance());
};
