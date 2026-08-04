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
import { Doohickey } from "@/types/Doohickey";

export interface DoohickeyFormHandle {
    submit(): Doohickey | null;
}

interface DoohickeyFormProps {
    doohickey?: Doohickey | null;
}

const DoohickeyForm = forwardRef<DoohickeyFormHandle, DoohickeyFormProps>(
    ({ doohickey }, ref) => {
        const [ name, setName ] = useState(doohickey?.name ?? "");
        const [ foo, setFoo ]   = useState(doohickey?.foo ?? "");
        const [ bars, setBars ] = useState(doohickey?.bars?.toString() ?? "");

        const [ errors, setErrors ] = useState({
            name: "",
            foo: "",
            bars: ""
        });

        function validate() {
            const next = {
                name: "",
                foo: "",
                bars: ""
            }

            if (!name.trim()) {
                next.name = "Name is required.";
            }

            if (!foo.trim()) {
                next.foo = "Foo is required."
            }

            const parsedBars = Number(bars);

            if (Number.isNaN(parsedBars)) {
                next.bars = "Bars must be a number.";
            } else if (parsedBars < 0) {
                next.bars = "Bars must be zero or greater.";
            } else if (!Number.isInteger(parsedBars)) {
                next.bars = "Bars must be an integer.";
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
                    id: doohickey?.id,
                    name: name.trim(),
                    foo: foo.trim(),
                    bars: Number(bars)
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

                <Field.Root invalid={!!errors.foo}>
                    <Field.Label>Foo</Field.Label>
                    <Input
                        value={foo}
                        onChange={(e) => setFoo(e.target.value)}
                    />
                    <Field.ErrorText>
                        {errors.foo}
                    </Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.bars}>
                    <Field.Label>Bars</Field.Label>
                    <Input
                        type="number"
                        value={bars}
                        step={1}
                        min={0}
                        onChange={(e) => setBars(e.target.value)}
                    />
                    <Field.ErrorText>
                        {errors.bars}
                    </Field.ErrorText>
                </Field.Root>
            </Stack>
        );
    }
);

DoohickeyForm.displayName = "DoohickeyForm";

export default DoohickeyForm;