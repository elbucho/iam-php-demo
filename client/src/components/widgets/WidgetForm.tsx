import {
    Field,
    Input,
    Stack
} from "@chakra-ui/react";
import {
    forwardRef,
    useImperativeHandle,
    useState
} from "react";
import { Widget } from "@/types/Widget";

export interface WidgetFormHandle {
    submit(): Widget | null;
}

interface WidgetFormProps {
    widget?: Widget | null;
}

const WidgetForm = forwardRef<WidgetFormHandle, WidgetFormProps>(
    ({ widget }, ref) => {
        const [ name, setName ] = useState(widget?.name ?? "");
        const [ type, setType ] = useState(widget?.type ?? "");
        const [ cost, setCost ] = useState(widget?.cost?.toString() ?? "");

        const [ errors, setErrors ] = useState({
            name: "",
            type: "",
            cost: ""
        });

        function validate() {
            const next = {
                name: "",
                type: "",
                cost: ""
            }

            if (!name.trim()) {
                next.name = "Name is required.";
            }

            if (!type.trim()) {
                next.type = "Type is required."
            }

            const parsedCost = Number(cost);

            if (Number.isNaN(parsedCost)) {
                next.cost = "Cost must be a number.";
            } else if (parsedCost < 0) {
                next.cost = "Cost must be zero or greater.";
            }

            setErrors(next);

            return Object.values(next).every(x => x === "");
        }

        useImperativeHandle(ref, () => ({
            submit() {
                if (!validate()) {
                    return null;
                }

                return {
                    id: widget?.id,
                    name: name.trim(),
                    type: type.trim(),
                    cost: Number(cost)
                };
            }
        }));

        return (
            <Stack gap={5}>
                <Field.Root invalid={!!errors.name}>
                    <Field.Label>Name</Field.Label>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Field.ErrorText>
                        {errors.name}
                    </Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.type}>
                    <Field.Label>Type</Field.Label>
                    <Input
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                    <Field.ErrorText>
                        {errors.type}
                    </Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.cost}>
                    <Field.Label>Cost</Field.Label>
                    <Input
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                    />
                    <Field.ErrorText>
                        {errors.cost}
                    </Field.ErrorText>
                </Field.Root>
            </Stack>
        );
    }
);

WidgetForm.displayName = "WidgetForm";

export default WidgetForm;