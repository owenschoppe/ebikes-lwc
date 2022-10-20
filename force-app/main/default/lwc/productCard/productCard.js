import { LightningElement, wire } from 'lwc';

// Lightning Message Service and a message channel
import { NavigationMixin } from 'lightning/navigation';
import { subscribe, MessageContext } from 'lightning/messageService';
import PRODUCT_SELECTED_MESSAGE from '@salesforce/messageChannel/ProductSelected__c';

// Utils to extract field values
import { getFieldValue } from 'lightning/uiRecordApi';

// Product__c Schema
import PRODUCT_OBJECT from '@salesforce/schema/Product__c';
import NAME_FIELD from '@salesforce/schema/Product__c.Name';
import PICTURE_URL_FIELD from '@salesforce/schema/Product__c.Picture_URL__c';
import CATEGORY_FIELD from '@salesforce/schema/Product__c.Category__c';
import LEVEL_FIELD from '@salesforce/schema/Product__c.Level__c';
import MSRP_FIELD from '@salesforce/schema/Product__c.MSRP__c';
import BATTERY_FIELD from '@salesforce/schema/Product__c.Battery__c';
import CHARGER_FIELD from '@salesforce/schema/Product__c.Charger__c';
import MOTOR_FIELD from '@salesforce/schema/Product__c.Motor__c';
import MATERIAL_FIELD from '@salesforce/schema/Product__c.Material__c';
import FOPK_FIELD from '@salesforce/schema/Product__c.Fork__c';
import FRONT_BRAKES_FIELD from '@salesforce/schema/Product__c.Front_Brakes__c';
import REAR_BRAKES_FIELD from '@salesforce/schema/Product__c.Rear_Brakes__c';

/**
 * Component to display details of a Product__c.
 */
export default class ProductCard extends NavigationMixin(LightningElement) {
    // Exposing fields to make them available in the template
    categoryField = CATEGORY_FIELD;
    levelField = LEVEL_FIELD;
    msrpField = MSRP_FIELD;
    batteryField = BATTERY_FIELD;
    chargerField = CHARGER_FIELD;
    motorField = MOTOR_FIELD;
    materialField = MATERIAL_FIELD;
    forkField = FOPK_FIELD;
    frontBrakesField = FRONT_BRAKES_FIELD;
    rearBrakesField = REAR_BRAKES_FIELD;

    // Id of Product__c to display
    recordId;

    // Product fields displayed with specific format
    productName;
    productPictureUrl;

    /** Load context for Lightning Messaging Service */
    @wire(MessageContext) messageContext;

    /** Subscription for ProductSelected Lightning message */
    productSelectionSubscription;

    connectedCallback() {
        // Subscribe to ProductSelected message
        this.productSelectionSubscription = subscribe(
            this.messageContext,
            PRODUCT_SELECTED_MESSAGE,
            (message) => this.handleProductSelected(message.productId)
        );
    }

    handleRecordLoaded(event) {
        const { records } = event.detail;
        const recordData = records[this.recordId];
        this.productName = getFieldValue(recordData, NAME_FIELD);
        this.productPictureUrl = getFieldValue(recordData, PICTURE_URL_FIELD);
    }

    /**
     * Handler for when a product is selected. When `this.recordId` changes, the
     * lightning-record-view-form component will detect the change and provision new data.
     */
    handleProductSelected(productId) {
        this.recordId = productId;
    }

    handleNavigateToRecord() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: PRODUCT_OBJECT.objectApiName,
                actionName: 'view'
            }
        });
    }

    value = 'inProgress';

    get options() {
        return [
            { label: 'New', value: 'new' },
            { label: 'In Progress', value: 'inProgress' },
            { label: 'Finished lkjahdfk sadlkjfh ksaldjhf klsadhf kljsdh fkljshad fkljhsd kfljhasd lkfjh sdkljfh sdlkjfh d', value: 'finished' },
        ];
    }

    get richtext() {
        return `<span style="font-size: 12px;">
                            For severance payments or adjustments to final pay, bonuses, or commissions that were only
                            able to be calculated after termination of employment, while the service agreement is in
                            effect can be processed for an active client.
                            <br><br>
                            To add a terminated worksite employee to the on-cycle payroll up to 6 months post
                            termination effective date, please follow the navigation instructions below:
                            <br><br><u><b>Path:</b></u><br>
                            Admin/ Manager View Icon &gt;
                            Payroll &gt; Enter Payroll
                        </span>
                        
                        <ol>
                            <li>
                                <span style="font-size: 12px;">
                                    <span style="font-family: Verdana,Geneva,sans-serif;">
                                        This will display the Payroll Dashboard with a calendar and underneath that
                                        calendar, it will show previously completed on-cycle payrolls (grey boxes and
                                        displayed as “Completed”) and the current on-cycle payroll (blue box displayed
                                        as “New or “Continue”).
                                    </span>
                                </span>
                            </li>
                            <li>
                                <span style="font-size: 12px;">
                                    <span style="font-family: Verdana,Geneva,sans-serif;">
                                        Select the blue box for the pay group that you want to enter payroll for which
                                        will take you to the Process Payroll screen that will display all your active
                                        worksite employees included on this payroll.
                                    </span>
                                </span>
                            </li>
                            <li>
                                <span style="font-size: 12px;">
                                    <span style="font-family: Verdana,Geneva,sans-serif;">
                                        Click on the blue “
                                        <b>Add/Remove Terminated Employees</b>
                                        ” link located on the bottom left corner of the screen.
                                    </span>
                                </span>
                            </li>
                            <li>
                                <span style="font-size: 12px;">
                                    <span
                                        style="font-family: Verdana,Geneva,sans-serif;">
                                        Select the terminated employee
                                        that you want to add to this payroll
                                    </span>
                                </span>
                            </li>
                            <li>
                                <span style="font-size: 12px;">
                                    <span
                                        style="font-family: Verdana,Geneva,sans-serif;">
                                        Click on the orange “Submit”
                                        button
                                    </span>
                                </span>
                            </li>
                            <li>
                                <span style="font-size: 12px;">
                                    <span
                                        style="font-family: Verdana,Geneva,sans-serif;">Terminated Employee will now
                                        appear alphabetically on the list of employees included on this payroll, but you
                                        will only be allowed to enter earnings codes and amounts in the Other Earnings
                                        column for terminated employees.
                                    </span>
                                </span>
                            </li>
                            <li>
                                <span style="font-size: 12px;">
                                    <span
                                        style="font-family: Verdana,Geneva,sans-serif;">Save the payroll when you are
                                        done making edits
                                    </span>
                                </span>
                            </li>
                        </ol> <br>
                        <span style="font-size: 12px;">
                            <span
                                style="font-family: Verdana,Geneva,sans-serif;">
                                If the payment to a terminated worksite
                                employee is initiated beginning in the seventh (7) month post termination effective
                                date, a Defense Indemnity Agreement (DIA) may be required. To obtain additional next
                                steps, please contact us via email.
                            </span>
                            </span>`;
    }

    handleChange(event) {
        this.value = event.detail.value;
    }
}
