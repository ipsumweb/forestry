<?php
class Pages extends CI_Controller {

	public function view($page = 'home')
	{
        $page = $this->uri->segment(1);
        if(!$page) {
        	$page = 'home'; // default
        }
        
        $data['page'] = $page;
        $data['title'] = ucfirst($page); // Capitalize the first letter
        	        
        // if there is a secondary URI clue, use it
        $data['park'] = $this->uri->segment(2); // won't be used
        $data['whichController'] = 'pageController';	 
       	
        $this->load->view('templates/header', $data);
        $this->load->view('pages/home', $data);
        $this->load->view('templates/footer', $data);
	}
	
	
	public function park()
	{        	        
        //$data['page'] = $data['park'] = $park = $this->uri->segment(2);
		$data['page'] = $this->uri->segment(1);
		$data['park'] = $this->uri->segment(2); // should be the name of the park as hyphen
        
        $data['whichController'] = 'parkController';
        
        $this->load->view('templates/header', $data);
        $this->load->view('pages/park', $data);
        $this->load->view('templates/footer', $data);
	}

	
	public function map()
	{        	        
        //$data['page'] = $data['park'] = $park = $this->uri->segment(2); // should be the name of the park as hyphen
        $data['page'] = $this->uri->segment(1);
		$data['park'] = $this->uri->segment(2); // should be the name of the park as hyphen

		$data['which_modal'] = $this->uri->segment(3); // IF coming from search page... /map/forest-park/0 would be 1st modal
		
		if( ! $data['which_modal'] ) 
			$data['which_modal'] = 0; // modalIDs number 1 to X, skipping some, etc. // set to 0 if false
		
		$this->load->view('templates/header', $data);
		$this->load->view('pages/map', $data);
		$this->load->view('templates/partial_footer', $data);
		
	}

	
	public function search()
	{
		$data['page'] = "search";
		$data['park'] = "";
		
		$data['whichController'] = 'searchController';

        $this->load->view('templates/header', $data);
        $this->load->view('pages/search', $data);
        $this->load->view('templates/footer', $data);
		
	}

	
	public function contact() 
	{
		$data['page'] = "contact";
		$data['park'] = "";
		
		$data['whichController'] = 'contactController';

        $this->load->view('templates/header', $data);
        $this->load->view('pages/contact', $data);
        $this->load->view('templates/footer', $data);
	}

	
	// for the pages that load within a modal as their own entity
	public function partial($page) {	
		// the content for these is stored as a complete set of HTML
		// load it from the DB and render to partial page	
		
		$q = "select * from site_partials 
			where partialName = '$page'";
		$query = $this->db->query($q);
		$result = $query->row_array();
		
		$data['partialContent'] = $result['partialContent'];
		$data['modalItemID'] = $result['modalItemID'];
		
		$this->load->view('templates/partial_header', $data);
		$this->load->view('pages/partial', $data);
		$this->load->view('templates/partial_header', $data);
	}
}