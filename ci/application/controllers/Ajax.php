<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ajax extends CI_Controller {

	public function getPageContent() {
		$page = $this->input->get('page', TRUE); //$_POST['page'];
		//echo $page;
		$query = $this->db->get_where('site_pages', array('pageURL'=>$page));
        echo json_encode ( $query->row_array() );
       	
	}
	
	
	public function getPageContentByID() {
		$pageID = $this->input->get('pageID', TRUE); //$_POST['page'];
		//echo $page;
		$query = $this->db->get_where('site_pages', array('pageID'=>$pageID));
		
		$result = $query->row_array();
		$result['cleanTitle'] = $this->cleanHTML($result['pageTitle']);	
			
        echo json_encode ( $result );
       	
	}
	

	public function getParkContent() {
		$park = $this->input->get('park', TRUE); // uri string, e.g. "forest-park"

		$query = $this->db->get_where('park_lookup', array('pkInfoHash'=>$park));
        echo json_encode ( $query->row_array() );
       	
	}
	
	
	public function getParkContentByID() {
		$id = $this->input->get('id', TRUE); // park_lookup.id

		$query = $this->db->get_where('park_lookup', array('id'=>$id));
		
		$result = $query->row_array();
		$result['cleanName'] = $this->cleanHTML($result['pkName']);
		
        echo json_encode ( $result );
       	
	}
	
	// gets fancy list of all site content, ish; filtered on page with angular
	public function getSearchContent() {
		// create temp table with values for search
		$this->db->trans_start();
		$this->db->query('CREATE TEMPORARY TABLE tempParkItems (
				title varchar(4000),
				txt varchar(4000), 
				url text
				)');
		// select matching title or text from the site_pages table
		$this->db->query("insert into tempParkItems
			select CONCAT(pageTitle, ' (page)') as title, 
			pageText as txt, 
			pageURL as url
			from site_pages");
		// select matching title or text from the park_lookup table
		$this->db->query("insert into tempParkItems
			select CONCAT(pkName, ' (park)') as title, 
			pkHomeText as txt, 
			CONCAT('/park/', pkInfoHash)
			from park_lookup where isActive = 1");
		// select matching title or text from the map/modal items table.. url is more complex, opens modal on map load
		$this->db->query("insert into tempParkItems
			select 
			CONCAT(itemTitle, ' (map info box)') as title,
			otherHTML as txt,
			CONCAT('/map/',	
				(select pkInfoHash from park_lookup where id=parkID),
				'/',
				modalItemID)
			   as url
			from map_items
			where modalItemID not in (select modalItemID from site_partials);");
		// select matching text from the site partials index
		$this->db->query("insert into tempParkItems
			select CONCAT(itemTitle, ' (map info box)') as title, (select partialContent from site_partials where site_partials.modalItemID=map_items.modalItemID) as txt, CONCAT('/map/', (select pkInfoHash from park_lookup where id=parkID), '/', modalItemID) as url from map_items where modalItemID in (select modalItemID from site_partials);");

		$this->db->trans_complete();
		
		// select all the results
		$q = "select * from tempParkItems";
		$query = $this->db->query($q); 
		
		$cleaned = array();
		
		// briefly clean html char's from this stuff
		foreach($query->result_array() as $item) {
			// Strip HTML Tags
			$item['title'] = $this->cleanHTML($item['title']);
			
			$item['txt'] = $this->cleanHTML($item['txt']);
			
			// handle if it's a modal item that only has an iframe of content on it
			if (strpos($item['title'], "info box") && ! $item['txt']) {
				$item['txt'] = "{ embedded video content }";
			}
			
			$cleaned[] = $item;
		}
		
		// return results to ajax call
        echo json_encode ( $cleaned );  

        // drop the temp table
        $q = "drop table tempParkItems";
		$query = $this->db->query($q);        
	} 

	
	// all the items for the map modal - nav bar	
	public function getMapContent() {
		$park = $this->input->get('park', TRUE); // uri string; need just park id #
		
		$q = "select * from map_items where parkID = 
				(select id from park_lookup where pkInfoHash = '$park')
				order by itemOrder";
		$query = $this->db->query($q);
		
        echo json_encode ( $query->result_array() );      	
	}	

	
	// handles the new modal templates which have search/replace strings, so the CMS can work modularly
	public function getTemplatePieces() {
		$modalID = $this->input->get('modalItemID', TRUE); 
		$isSubModal = $this->input->get('isSubModal', TRUE); // can be 0 (not submodal), or WILL BE THE PPID
		
		if($isSubModal) {
			$isSubModalString = "isSubModal = $isSubModal";
		} else {
			$isSubModalString = "isSubModal = 0";
		}
		
		$q = "select replaceName, theContent from template_content where modalItemID = $modalID and $isSubModalString";
		$query = $this->db->query($q);
		
		// rows of content pieces, that will need to insert into the bigger template shell string
        $result = $query->result_array();   
		
	
		
		$q = "select shellText from template_shells 
			where templateName = 
				(select templateName from template_content 
					where modalItemID = $modalID and $isSubModalString limit 1)";
					
		$query = $this->db->query($q);
		$shell = $query->row_array();
		$shellText = $shell['shellText'];
		
		// now do the string replace: loop through REPLACE items and replace them in shell
		foreach($result as $row) {
			$replKey = $row['replaceName'];
			$replText = $row['theContent'];
			
			$shellText = str_replace($replKey, $replText, $shellText);
		}
		
		echo $shellText;
	}
	
	
	
	// just the bg image for this map page	
	public function getParkBG() {
		$park = $this->input->get('park', TRUE); // uri string; need just park id #
		
		$q = "select pkMapBgImg from park_lookup where pkInfoHash = '$park'";
		$query = $this->db->query($q);
		
        echo json_encode ( $query->row_array() );      	
	}		
	
	
	// do a text merge on sub modal (popup) content using new search/replace functions
	public function getModalSubPopupContent() {
		// $modalItemID = $this->input->get('modalItemID', TRUE);
		
		
		//
		// //$query = $this->db->get('map_items');
		// $q = "select * from partial_popups where modalItemID = $modalItemID";
		// $query = $this->db->query($q);
		//
		//         echo json_encode ( $query->result_array() );     	
		
		$ppID = $this->input->get('ppID', TRUE);
		
		// first get the title
		$q = "select ppTitle from partial_popups where ppID = $ppID";
		$query = $this->db->query($q);
		$titleRes = $query->row_array();
		$ppTitle = $titleRes['ppTitle'];


		// now get template merger pieces
		$q = "select replaceName, theContent from template_content where isSubModal = $ppID";
		$query = $this->db->query($q);
		
		// rows of content pieces, that will need to insert into the bigger template shell string
        $result = $query->result_array();   

		
		$q = "select shellText from template_shells 
			where templateName = 
				(select templateName from template_content 
					where isSubModal = $ppID limit 1)";
					
		$query = $this->db->query($q);
		$shell = $query->row_array();
		$shellText = $shell['shellText'];
		
		// now do the string replace: loop through REPLACE items and replace them in shell
		foreach($result as $row) {
			$replKey = $row['replaceName'];
			$replText = $row['theContent'];
			
			$shellText = str_replace($replKey, $replText, $shellText);
		}
		
		
		$myAnswer['ppContent'] = $shellText;
		$myAnswer['ppTitle'] = $ppTitle;
		
		echo json_encode ( $myAnswer );   
	}	
	
	
	
	
	
	// just one item for the modal content
	public function getOneModalItem() {
		$modalItemID = $this->input->get('$modalItemID', TRUE); 
		
		$query = $this->db->get_where('map_items', array('$modalItemID'=>$modalItemID));
        echo json_encode ( $query->result_array() );			
	}
	
	// send email from contac tform
	public function sendEmail() {
		$this->load->library('email');

		$this->email->from($_POST['email'], $_POST['name']);
		$this->email->to('PACE@oregonstate.edu'); 
		//$this->email->cc('another@another-example.com'); 
		//$this->email->bcc('them@their-example.com'); 
		
		$this->email->subject("From exploreoregonforests.org: " . $_POST['subject']);
		$this->email->message($_POST['message']);	
		
		$this->email->send();
		
		//echo json_encode( $formData );
		//echo $this->email->print_debugger();
	}


	// get the content for the main nav	 -- NEEDS UPDATING, JUST COPIED FROM ADMIN VERSION FOR NOW
	public function basicGetMenuItems() {
		$q = "select pageTitle as pageName, pageURL as URI from site_pages";
		$query = $this->db->query($q);
		$pages = $query->result_array();

		$q = "select pkMenuName as parkName, pkInfoHash as URI from park_lookup";
		$query = $this->db->query($q);
		$parks = $query->result_array();	
		
		$cleaned = array();
		
		// strip HTML tags
		foreach($pages as $item) {
			$item['pageName'] = $this->cleanHTML($item['pageName']);
			
			$cleaned[] = $item;	
		}

		
		$result['pages'] = $cleaned;
		$result['parks'] = $parks;	
		
		echo json_encode ( $result );
	}	
	
	// admin functions and features
	
	// get them logged in, or not
	public function adminLogin() {
		$username = $this->input->get('username', TRUE); 
		$password = $this->input->get('password', TRUE); 
				
		
		// get the encrypted pwd for this user, if exists
		$q = "select password from forestry_users where username = '$username'";
		$query = $this->db->query($q);
		$pwd_array = $query->row_array();
		
		// decrypt and see if it matches entered $pwd
		$decrypted_password = $this->encryption->decrypt($pwd_array['password']);
		
		// if so, start a session
		if( $decrypted_password == $password ) {
			$this->session->is_logged_in = true;
			// and return "true"
			echo 1;
		}
		else {
			$this->session->is_logged_in = false;
			// else return "false"
			echo 0;
		}

	}
	
	
	// on /admin/edit, get disparate lists of pages and parks, for clickable to edit
	public function getAdminEditList() {
		$q = "select id, pkName from park_lookup order by pkOrder";
		$query = $this->db->query($q);
		$parks = $query->result_array();	

		$parkList = array();
		foreach($parks as $item) {
			$item['pkName'] = $this->cleanHTML($item['pkName']);
			
			$parkList[] = $item;
		}	

		$q = "select pageID, pageTitle from site_pages order by pageID";
		$query = $this->db->query($q);
		$pages = $query->result_array();	
		
		$pageList = array();
		
		foreach($pages as $item) {
			$item['pageTitle'] = $this->cleanHTML($item['pageTitle']);
			
			$pageList[] = $item;
		}		
		
		$result['parkList'] = $parkList;
		$result['pageList'] = $pageList;	
		
		echo json_encode ( $result );	
	}
	
	

	
	
	
	// get modals, for particular parkID	
	public function getAdminModalList() {
		$parkID = $this->input->get('parkID', TRUE); 
		
		$q = "select modalItemID, itemTitle, itemOrder from map_items where parkID = $parkID order by itemOrder ";
		$query = $this->db->query($q);
		$parks = $query->result_array();	

		echo json_encode ( $parks );
	}


	// get a few details about a modal
	public function getAdminModalInfo() {
		$modalItemID = $this->input->get('modalItemID', TRUE); 
		
		$q = "select parkID, pkName, modalItemID, itemTitle, itemOrder from map_items, park_lookup where modalItemID = $modalItemID and id=parkID";
		$query = $this->db->query($q);
		$info = $query->row_array();
		
		$info['cleanTitle'] = $this->cleanHTML($info['pkName']);
		
		echo json_encode( $info );
	}


	// get a few details about a submodal aka popup
	public function getAdminSubModalInfo() {
		$ppID = $this->input->get('ppID', TRUE); 
		
		$q = "select ppID, ppTitle, PL.pkName, PP.parkID, PP.modalItemID, M.itemTitle from partial_popups PP, park_lookup PL, map_items M where ppID = $ppID and id = PP.parkID and M.modalItemID = PP.modalItemID ";
		$query = $this->db->query($q);
		$info = $query->row_array();
		
		$info['cleanTitle'] = $this->cleanHTML($info['pkName']);
		
		echo json_encode( $info );
	}



	// get submodals, for particular modalItemID	
	public function getAdminSubmodalList() {
		$modalItemID = $this->input->get('modalItemID', TRUE); 
		
		$q = "select * from partial_popups where modalItemID = $modalItemID";
		$query = $this->db->query($q);
		$submodals = $query->result_array();	

		echo json_encode ( $submodals );
	}	
	
	
	public function getAdminModalTemplatePieces() {
		$modalID = $this->input->get('modalItemID', TRUE); 
		$isSubModal = $this->input->get('isSubModal', TRUE); // can be 0 (not submodal), or WILL BE THE PPID
		
		if($isSubModal) {
			$isSubModalString = "isSubModal = $isSubModal";
		} else {
			$isSubModalString = "isSubModal = 0";
		}
		
		$q = "select * from template_content where modalItemID = $modalID and $isSubModalString";
		$query = $this->db->query($q);
        $pieces = $query->result_array();   

		
		$q = "select * from template_shells 
			where templateName = 
				(select templateName from template_content 
					where modalItemID = $modalID and $isSubModalString limit 1)";
		$query = $this->db->query($q);
		$shell = $query->row_array();
		
		$result['pieces'] = $pieces;
		$result['shell'] = $shell;	
		
		echo json_encode ( $result );	
		
	}
	
	
	
	// editing page title or content, on /admin/page/$page
	public function adminSaveEditPage() {

		$pageID = $this->input->post('pageID');
		$pageTitle = $this->input->post('pageTitle');
		$pageText = $this->input->post('pageText');

		$q = "update site_pages set pageText = " . $this->db->escape( $pageText ) . ",  pageTitle = " . $this->db->escape( $pageTitle ) . " where pageID = $pageID";


		$query = $this->db->query($q);

		if(!$query ) {
			echo $this->db->error();
		}
		else {
			echo false; // hasError
		}
	}	

	
	
	// editing page title or content, on /admin/park/$id
	public function adminSaveEditPark() {

		$id = $this->input->post('id');
		$pkName = $this->input->post('pkName');
		$pkHomeText = $this->input->post('pkHomeText');

		$q = "update park_lookup set pkName = " . $this->db->escape( $pkName ) . ",  pkHomeText = " . $this->db->escape( $pkHomeText ) . " where id = $id";

//		echo $q;
		$query = $this->db->query($q);

		if(!$query ) {
			echo $this->db->error();
		}
		else {
			echo false; // hasError
		}
	}	
	

	// saving template pieces of a modal! woo.
	public function adminSaveEditModalPieces() {

		$contentID = $this->input->post('contentID');
		$theContent = $this->input->post('theContent');

		$q = "update template_content
			set theContent = " . $this->db->escape( $theContent ) . "
			where contentID = $contentID";

//		echo $q;
		$query = $this->db->query($q);

		if(!$query ) {
			echo $this->db->error();
		}
		else {
			echo false; // hasError
		}
	}	
		

	// save the title of a modal, if edited
	public function adminSaveModalTitle() {
		$modalItemID = $this->input->post('modalItemID');
		$newTitle = $this->input->post('newTitle');
		
		$q = "update map_items set itemTitle = " . $this->db->escape( $newTitle ) . "
			where modalItemID = $modalItemID";

//		echo $q;
		$query = $this->db->query($q);

		if(!$query ) {
			echo $this->db->error();
		}
		else {
			echo false; // hasError
		}
	}


	// save the title of a submodal, if edited
	public function adminSaveSubModalTitle() {
		$ppID = $this->input->post('ppID');
		$newTitle = $this->input->post('newTitle');
		
		$q = "update partial_popups
			set ppTitle = " . $this->db->escape( $newTitle ) . "
			where ppID = $ppID";

//		echo $q;
		$query = $this->db->query($q);

		if(!$query ) {
			echo $this->db->error();
		}
		else {
			echo false; // hasError
		}
	}

	
	
	
	
	
	
	
	
	
	// helper function
	public function cleanHTML($text) {
		$text = str_replace("<br>"," ", $text); 
		$text = strip_tags($text);
		
		return $text;
	}

	
	
	
}
