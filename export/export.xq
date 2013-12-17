(: XQuery main module :)
<pennterest xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="pennterest.xsd">
<operator>Group TBD</operator>
<web_url>www.shanjoshandreimainak.com</web_url>
{
  for $u in doc("export.xml")/database return
        {for $object in $u/OBJECTS/tuple
            let $tags := $u/OBJECTTAGS/tuple[data(OBJECTID) = data({$object}/OBJECTID)]
            return <object>
            <id>{data({$object}/OBJECTID)}</id>
            <source>{data({$object}/SOURCEID)}</source>
            <type>{data({$object}/OBJECTTYPE)}</type>
            <url>{data({$object}/URL)}</url>
            {for $tag in $tags
            return <tag>{data({$tag}/TAG)}</tag>}
            </object>
            }
}
{
   for $u in doc("export.xml")/database return
   {
        for $user in $u/USERS/tuple
            let $interests := $u/INTERESTS/tuple[data(USERID) = data({$user}/USERID)]
            let $friends := $u/FRIENDS/tuple[data(USERID) = data({$user}/USERID)]
            let $boards := $u/BOARDS/tuple[data(USERID) = data({$user}/USERID)]
            let $pins := $u/PINS/tuple[data(USERID) = data({$user}/USERID)]
            let $ratings := $u/RATING/tuple[data(USERID) = data({$user}/USERID)]
            return <user>
            <login>{data({$user}/EMAILID)}</login>
            <email>{data({$user}/EMAILID)}</email>
            <givenname>{data({$user}/FIRSTNAME)}</givenname>
            <surname>{data({$user}/LASTNAME)}</surname>
            <affiliation>{data({$user}/AFFILIATION)}</affiliation>
            <birthday>1990-12-12</birthday>
            {for $interest in $interests
            return <interests>{data({$interest}/INTEREST)}</interests>}
            {for $friend in $friends
            	 return <friend>{data({$friend}/EMAILID)}</friend>
            }
            {for $board in $boards
                 return <board>
                   <name>{data({$board}/BOARDNAME)}</name>
                 </board>
            }
            {for $pin in $pins
                 return <pin>
                   <objectId>{data({$pin}/OBJECTID)}</objectId>
                   {for $object in $u/OBJECTS/tuple[data(OBJECTID) = data({$pin}/OBJECTID)]
                         return <sourceId>{data({$object}/SOURCEID)}</sourceId>}
                   {for $board in $u/BOARDS/tuple[data(BOARDID) = data({$pin}/BOARDID)]
                         return <board>{data({$board}/BOARDNAME)}</board>}
                 </pin>
            }
            {for $rating in $ratings
                 return <rating>
                   <objectId>{data({$rating}/OBJECTID)}</objectId>
                   {for $object in $u/OBJECTS/tuple[data(OBJECTID) = data({$rating}/OBJECTID)]
                         return <sourceId>{data({$object}/SOURCEID)}</sourceId>}
                   <rating>{data({$rating}/SCORE)}</rating>
                 </rating>
            }
        </user>
        }
}
</pennterest>        
