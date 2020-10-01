interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseMailInterfaceDTO {
  file: string;
  variables: ITemplateVariables;
}
