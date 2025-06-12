export type HomeStackParmsList = {
    // undifine = indica que la vista no requiere parametro

    Home: undefined;
    Details: { id: string }; // La vista requiere un parámetro id de tipo string
    Stacks: undefined;
    Form: undefined;
    Calculadora : undefined;
}
