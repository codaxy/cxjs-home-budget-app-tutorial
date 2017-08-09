import {HtmlElement, Window, MonthField, NumberField, Button} from 'cx/widgets';
import {computable, LabelsTopLayout} from 'cx/ui';

export default <cx>
    <Window
        title="Random Data Generator"
        visible:bind="$page.generator.visible"
        bodyStyle="padding: 20px"

    >
        <div layout={{type: LabelsTopLayout, vertical: true, mod: 'stretch'}}>
            <MonthField
                label="Period"
                range
                from:bind="$page.generator.from"
                to:bind="$page.generator.to"
                required
                style="width: 100%;"
            />

            <NumberField
                label="Amount"
                value:bind="$page.generator.amount"
                required
                style="width: 100%;"
            />
        </div>

        <div putInto="footer">
            <Button onClick="generate">Generate</Button>
            <Button onClick="clear">Clear</Button>
        </div>
    </Window>
</cx>
