/*************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 *  Copyright 2022 Adobe
 *  All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 **************************************************************************/

export type AuthUserState = {
    accessToken: string;
    signOn: boolean;
    canCreateRepo: boolean;
    openDialog: boolean;
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
