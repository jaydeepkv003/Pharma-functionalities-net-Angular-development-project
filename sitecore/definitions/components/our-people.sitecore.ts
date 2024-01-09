import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the our-people component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function(manifest: Manifest) {
  manifest.addComponent({
    name: 'OurPeople',
    icon: SitecoreIcon.DocumentTag,
    placeholders: ['phOurPeople'],       
    fields: [
      { name: 'heading', type: CommonFieldTypes.SingleLineText, standardValue:'$name' },
    ],
  });
}
