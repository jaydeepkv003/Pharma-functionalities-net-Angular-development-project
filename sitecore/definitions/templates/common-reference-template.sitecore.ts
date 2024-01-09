// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * This is the data template for an individual _item_ in the Styleguide's Content List field demo.
 */
export default function(manifest: Manifest) {
  manifest.addTemplate({
    name: 'Common-Reference-Template',
    fields: [
      { name: 'title', type: CommonFieldTypes.RichText },
      { name: 'targetlink', type: CommonFieldTypes.GeneralLink },
      { name: 'orderNumber', type: CommonFieldTypes.SingleLineText },             
      { name: 'isAuthenticationRequired', type: CommonFieldTypes.Checkbox }              
  ],
  });
}
