export type RolParamsList = {
  RolList: undefined;
  RolRegister: undefined;
  RolUpdate: { id: number }; // Aquí el ID que pasas para editar
};
export type UserParamsList = {
  UserList: undefined;
  UserRegister: undefined;
  UserUpdate: { id: number }; // Aquí el ID que pasas para editar
};

export type permissionParamsList = {
  PermissionList: undefined;
  PermissionRegister: undefined;
  PermissionUpdate: { id: number };
};
export type formParamsList = {
  FormList: undefined;
  FormRegister: undefined;
  FormUpdate: { id: number };
};
export type moduleParamsList = {
  ModuleList: undefined;
  ModuleRegister: undefined;
  ModuleUpdate: { id: number };
};
export type rolFormPermissionParamsList = {
  RolFormPermissionList: undefined;
  RolFormPermissionRegister: undefined;
  RolFormPermissionUpdate: { id: number };
};

export type rolUserParamsList = {
  RolUserList: undefined;
  RolUserRegister: undefined;
  RolUserUpdate: { id: number };
};


export type formModuleParamsList = {
  FormModuleList: undefined;
  FormModuleRegister: undefined;
  FormModuleUpdate: { id: number };
};

export type personParamsList = {
  PersonList: undefined;
  PersonRegister: undefined;
  PersonUpdate: { id: number };
};


