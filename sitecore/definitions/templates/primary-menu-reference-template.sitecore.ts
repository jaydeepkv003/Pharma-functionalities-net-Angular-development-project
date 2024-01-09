// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * This is the data template for an individual _item_ in the Styleguide's Content List field demo.
 */
export default function (manifest: Manifest) {
  manifest.addTemplate({
    name: 'Primary-Menu-Reference-Template',
    fields: [
      { name: 'relatedImage', type: CommonFieldTypes.Image },
      { name: 'relatedImageText', type: CommonFieldTypes.SingleLineText }
    ],
    inherits: ['Common-Reference-Template']
  });
}
