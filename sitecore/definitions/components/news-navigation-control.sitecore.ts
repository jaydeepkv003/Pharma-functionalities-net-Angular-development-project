import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the news-navigation-control component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function(manifest: Manifest) {
  manifest.addComponent({
    name: 'NewsNavigationControl',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'heading', type: CommonFieldTypes.SingleLineText, standardValue:'$name' },
      { name: 'tab1_link', type: CommonFieldTypes.GeneralLink },
      { name: 'tab2_link', type: CommonFieldTypes.GeneralLink },
      { name: 'tab3_link', type: CommonFieldTypes.GeneralLink },
    ],
  });
}
