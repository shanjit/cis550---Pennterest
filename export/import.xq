(: XQuery main module :)
import module namespace functx = "http://www.functx.com/";
<database>
  <USERS>{
    let $users := doc("theirs.xml")/pennterest/user 
    for $user in $users
        let $fname := {data({$user}/givenname)}
        let $lname := {data({$user}/surname)}
        let $email := {data({$user}/email)}
        let $aff := {data({$user}/affiliation)}
        return <tuple>
            <USERID>{functx:index-of-node($users, $user)}</USERID>
            <FIRSTNAME>{$fname}</FIRSTNAME>
            <LASTNAME>{$lname}</LASTNAME>
            <EMAILID>{$email}</EMAILID>
            <PASSWORD>123=abc</PASSWORD>
            <AFFILIATION>{$aff}</AFFILIATION>             
          </tuple>       
  } </USERS>
  <FRIENDS>{
    let $users := doc("theirs.xml")/pennterest/user 
    for $friend in $users/friend
            let $friendUser := $users[data(login) = data({$friend})]
	    let $email := $friendUser/email
	    return <tuple>
                <USERID>{functx:index-of-node($users, $friend/..)}</USERID>
		<EMAILID>{data($email)}</EMAILID>
	      </tuple>       
  }</FRIENDS>
  <INTERESTS>{
    let $users := doc("theirs.xml")/pennterest/user 
    for $interest in $users/interests
        return <tuple>
            <USERID>{functx:index-of-node($users, $interest/..)}</USERID>
            <INTEREST>{data({$interest})}</INTEREST>             
          </tuple>       
  }</INTERESTS>
  <BOARDS>{
    let $users := doc("theirs.xml")/pennterest/user 
    for $board in $users/board
        return <tuple>
            <USERID>{functx:index-of-node($users, $board/..)}</USERID>
            <BOARDNAME>{data({$board}/name)}</BOARDNAME>
	    <BOARDID>{(functx:index-of-node($users, $board/..) * 100) + (functx:index-of-node($users/board/name, $board/name))}</BOARDID>
          </tuple>       
  }</BOARDS>
  <OBJECTS>{
    let $objects := doc("theirs.xml")/pennterest/object 
    for $object in $objects
        return <tuple>
        <OBJECTID>{data({$object}/id)}</OBJECTID>
        <SOURCEID>{data({$object}/source)}</SOURCEID>  
        <URL>{data({$object}/url)}</URL>
        <CACHED>0</CACHED>
        <OBJECTTYPE>{data({$object}/type)}</OBJECTTYPE>         
      </tuple>       
  }</OBJECTS>
  <OBJECTTAGS>{
    let $objects := doc("theirs.xml")/pennterest/object 
    for $object in $objects
        return <tuple>
        <OBJECTID>{data({$object}/id)}</OBJECTID>
        <SOURCEID>{data({$object}/source)}</SOURCEID>
        <TAG>{data({$object}/tag)}</TAG>   
      </tuple>       
  }</OBJECTTAGS>
  <PINS>{
    let $users := doc("theirs.xml")/pennterest/user 
    for $pin in $users/pin
        let $board := $pin/../board[data(name)=data({$pin/board})]
        return <tuple>
            <OBJECTID>{data({$pin}/objectId)}</OBJECTID>
            <SOURCEID>{data({$pin}/sourceId)}</SOURCEID>
            <USERID>{functx:index-of-node($users, $pin/..)}</USERID>
	    <BOARDID>{(functx:index-of-node($users, $board[1]/..) * 100) + (functx:index-of-node($users/board/name, $board[1]/name))}</BOARDID>
          </tuple>   
  }</PINS>
  <RATING>{
    let $users := doc("theirs.xml")/pennterest/user
    for $rating in $users/rating
        return <tuple>
            <OBJECTID>{data({$rating}/objectId)}</OBJECTID>
	    <SOURCEID>{data({$rating}/sourceId)}</SOURCEID>
            <USERID>{functx:index-of-node($users, $rating/..)}</USERID>
            <SCORE>{data({$rating}/rating)}</SCORE>                
          </tuple>  
  }</RATING>
</database>   
