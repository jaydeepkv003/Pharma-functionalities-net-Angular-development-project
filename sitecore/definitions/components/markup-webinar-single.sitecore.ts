import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the markup-webinar-single component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function (manifest: Manifest) {
  manifest.addRouteType({
    name: 'MarkupWebinarSingle',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'webinartitle', type: CommonFieldTypes.SingleLineText, standardValue:'$name', displayName: 'Title'},
      { name: 'summary', type: CommonFieldTypes.RichText },
      { name: 'formLink', type: CommonFieldTypes.GeneralLink },
      { name: 'coverphoto', type: CommonFieldTypes.Image },
      { name: 'brandsList', type: 'MultiList', source: `query:/sitecore/content/Sandbox/phrjss/home/Products/*[not(startswith(@@name, 'Page Components'))]`, },
      { name: 'phaseList', type: 'MultiList', source: `query:/sitecore/content/Sandbox/phrjss/home/Products//*[@@templatename='PhaseDetail']` },
      { name: 'techniquesList', type: 'MultiList', source: `query:/sitecore/content/Sandbox/phrjss/home/Techniques/*[not(startswith(@@name, 'Page Components'))]`, },
      { name: 'industryList', type: 'MultiList', source: `query:/sitecore/content/Sandbox/phrjss/home/Industries/*[not(startswith(@@name, 'Page Components'))]`, },

      // { name: 'webinarid', type: CommonFieldTypes.SingleLineText },
      // { name: 'brands', type: CommonFieldTypes.SingleLineText },
      // { name: 'techniques', type: CommonFieldTypes.SingleLineText },
      // { name: 'industry', type: CommonFieldTypes.SingleLineText },
      // { name: 'embedcode', type: CommonFieldTypes.RichText },
      // { name: 'videolink', type: CommonFieldTypes.GeneralLink },
    ],
  });
  // We're also adding a component, that we can put on our sample custom route type route.
  // This component will display the route level fields on the custom route type.
  manifest.addComponent({
    name: 'MarkupWebinarSingle',
    icon: SitecoreIcon.DocumentTag,
  });
}
