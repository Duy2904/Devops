/* eslint-disable no-unused-vars */
export const enum UserKey {
    fetchUserById = 'FETCH_USER_BY_ID',
    userUploadPhoto = 'USER_UPLOAD_PHOTO',
    fetchUserRole = 'FETCH_USER_ROLE',
    userChangePassword = 'USER_CHANGE_PASSWORD',
}

export const enum PersonalKey {
    fetchPersonal = 'FETCH_PERSONAL',
    updatePersonal = 'UPDATE_PERSONAL',
}

export const enum BranchKey {
    createBranch = 'CREATE_BRANCH',
    updateBranch = 'UPDATE_BRANCH',
    deleteBranch = 'DELETE_BRANCH',
    fetchBranchs = 'FETCH_BRANCHS',
    fetchBranchDetail = 'FETCH_BRANCH_DETAIL',
    fetchState = 'FETCH_STATE',
}

export const enum UploadKey {
    uploadPhoto = 'UPLOAD_PHOTO',
    uploadDocuments = 'UPLOAD_DOCUMENTS',
    deleteDocument = 'DELETE_DOCUMENT',
}

export const enum GroupKey {
    getGroupBranchs = 'GET_GROUP_BRANCHS',
    getGroupAgent = 'GET_GROUP_AGENT',
    getGroupDetail = 'GET_GROUP_DETAIL',
    getListGroupAgent = 'GET_LIST_GROUP_AGENT',
    createGroupAgent = 'CREATE_AGENT',
    updateGroupAgent = 'UPDATE_AGENT',
    createGroupAgentPermissions = 'CREATE_AGENT_PERMISSIONS',
    updateGroupAgentPermissions = 'UPDATE_AGENT_PERMISSIONS',
    deleteGroupAgent = 'DELETE_GROUP_AGENT',
    fetchAgentState = 'FETCH_AGENT_STATE',
}

export const enum RoleKey {
    fetchAgentPermissions = 'FETCH_AGENT_PERMISSIONS',
    fetchAdminPermissions = 'FETCH_ADMIN_PERMISSIONS',
    fetchRolePermissions = 'FETCH_ROLE_PERMISSIONS',
    createGroupAgentPermissions = 'CREATE_AGENT_PERMISSIONS',
}

export const enum TitleLevelsKey {
    fetchTitleLevels = 'FETCH_TITLE_LEVELS',
}

export const enum TourKey {
    getTourProviders = 'GET_TOUR_PROVIDERS',
    getTagsOnFilterPane = 'GET_TAGS_ON_FILTER_PANE',
}
