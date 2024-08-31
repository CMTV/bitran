export enum ErrorStage
{
    Parse,
    Render,
}

export interface ErrorData
{
    stage: ErrorStage;
    error: Error;
}