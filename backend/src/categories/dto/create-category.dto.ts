import { FlowType } from "src/common/enums";

// TODO: Add validation to this dto
// Study the possibility to use zod

export class CreateCategoryDto {
    name: string;

    description?: string;

    type: FlowType;
}
