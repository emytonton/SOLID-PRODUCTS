// esse cara é o contrato, ele descreve como são os use cases

export interface Usecase<InputDto, OutputDto>{
    execute(input: InputDto): Promise<OutputDto>;
}