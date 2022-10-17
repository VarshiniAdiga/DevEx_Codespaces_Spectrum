export type AuthUserState = {
    accessToken: string;
    signOn: boolean;
    canCreateRepo: boolean;
    openDialog: boolean;
    pasteAccessToken: boolean;
};

export type RepoMap = {
    name: string;
    url: string;
};

export type CreateRepoProps = {
    accessToken: string;
};

export type CreateRepoState = {
    repoCount: number;
    repoMap: Array<RepoMap>;
    displayAddon: boolean;
    template: string;
    createTemplate: boolean;
    userName: string;
    loadPage: boolean;
    codespace_url: string;
    new_repo_url: string;
    new_repo_name: string;
    clickToCreateProj: boolean;
};

export type TextFieldClipboardWrapperProps = {
    text: string;
};
