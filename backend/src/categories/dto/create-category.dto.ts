import { FlowType } from "src/common/enums";

export class CreateCategoryDto {
    name: string;

    description?: string;

    type: FlowType;
}
