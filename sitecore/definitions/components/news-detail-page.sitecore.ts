import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the news-detail-page component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function(manifest: Manifest) {
  manifest.addComponent({
    name: 'NewsDetailPage',
    icon: SitecoreIcon.Window,
    fields: [      
        { name: 'NewsHeading', type: CommonFieldTypes.SingleLineText },
        { name: 'NewsDescription', type: CommonFieldTypes.RichText },
        { name: 'MigrationId', type: CommonFieldTypes.SingleLineText },
        { name: 'ArticleYear', type: CommonFieldTypes.SingleLineText },
        { name: 'ArticleMonth', type: CommonFieldTypes.SingleLineText },
        { name: 'ArticleDay', type: CommonFieldTypes.SingleLineText },
        { name: 'ArticleTimeStamp', type: CommonFieldTypes.DateTime },
        { name: 'ArticlePublishedDate', type: CommonFieldTypes.Date },
        { name: 'image', type: CommonFieldTypes.Image },
        { name: 'PageTitle', type: CommonFieldTypes.SingleLineText },
        { name: 'PageKeywords', type: CommonFieldTypes.RichText },
        { name: 'PageDescription', type: CommonFieldTypes.RichText },
        { name: 'IsProtectedPage', type: CommonFieldTypes.Checkbox },
        { name: 'ShowinSitemap', type: CommonFieldTypes.Checkbox },        
    ],
  });
}
