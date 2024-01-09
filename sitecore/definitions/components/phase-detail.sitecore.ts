import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the phase-detail component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function(manifest: Manifest) {
  manifest.addRouteType({
    name: 'PhaseDetail',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'title', type: CommonFieldTypes.RichText, standardValue:'$name' },
      { name: 'heading', type: CommonFieldTypes.SingleLineText },
      { name: 'content', type: CommonFieldTypes.RichText },
      { name: 'brandImage', type: CommonFieldTypes.Image },
      { name: 'phaseDetailImage', type: CommonFieldTypes.Image },
      { name: 'phaseId', type: CommonFieldTypes.Number },
      { name: 'brandId', type: CommonFieldTypes.Number },
      { name: 'techniqueId', type: CommonFieldTypes.Number }
    ]
  });

  manifest.addComponent({
    name: 'PhaseDetail',
    icon: SitecoreIcon.DocumentTag,
  });
}
