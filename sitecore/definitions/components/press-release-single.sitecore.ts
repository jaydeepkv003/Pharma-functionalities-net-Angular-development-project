import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the press-release-single component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function(manifest: Manifest) {
  manifest.addComponent({
    name: 'PressReleaseSingle',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'heading', type: CommonFieldTypes.SingleLineText, standardValue:'$name' },
      { name: 'description', type: CommonFieldTypes.RichText }, 
      { name: 'migrationId', type: CommonFieldTypes.SingleLineText },
      { name: 'articleYear', type: CommonFieldTypes.Number },
      { name: 'articleMonth', type: CommonFieldTypes.Number },
      { name: 'articleDay', type: CommonFieldTypes.Number },
      { name: 'articleTimeStamp', type: CommonFieldTypes.DateTime },
      { name: 'articlePublishedDate', type: CommonFieldTypes.Date },
      { name: 'imageOne', type: CommonFieldTypes.Image },
      { name: 'pageLink', type: CommonFieldTypes.GeneralLink },
    ],
  });
}
