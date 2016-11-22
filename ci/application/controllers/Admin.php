<?php
class Admin extends CI_Controller {

	// default login page for admin user
	public function index()
	{
		$data['editing'] = '';
		
		if($this->session->is_logged_in) {
			redirect('/admin/edit');
		}

        $this->load->view('admin/header', $data);
        $this->load->view('admin/login', $data);
        $this->load->view('admin/footer', $data);
	}
	
	// if they click this, log them out and redirect to login page
	public function logout() {
		$this->session->is_logged_in = false;
		
		redirect('/admin/login');		
	}
	
	
	public function edit()
 	{
		if(! $this->session->is_logged_in) {
			redirect('/admin/login');
		}

		 $data['editing'] = '';

         $this->load->view('admin/header', $data);
         $this->load->view('admin/edit', $data);
         $this->load->view('admin/footer', $data);
 	}
	
	
	// would be like, /admin/park/3 (for ashland, where park_lookup.id = 3)
	public function park( )
 	{
		 if(! $this->session->is_logged_in) {
			redirect('/admin/login');
		 }
		 
		 $data['editing'] = $this->uri->segment(3);

         $this->load->view('admin/header', $data);
         $this->load->view('admin/park', $data);
         $this->load->view('admin/footer', $data);
 	}

	public function page( )
 	{
		 if(! $this->session->is_logged_in) {
			redirect('/admin/login');
		 }
		 
		 $data['editing'] = $this->uri->segment(3);

         $this->load->view('admin/header', $data);
         $this->load->view('admin/page', $data);
         $this->load->view('admin/footer', $data);
 	}	
	
	public function modal( )
 	{
		 if(! $this->session->is_logged_in) {
			redirect('/admin/login');
		 }
		 
		 $data['editing'] = $this->uri->segment(3);

         $this->load->view('admin/header', $data);
         $this->load->view('admin/modal', $data);
         $this->load->view('admin/footer', $data);
 	}	

	public function submodal( )
 	{
		 if(! $this->session->is_logged_in) {
			redirect('/admin/login');
		 }
		 
		 $data['editing'] = $this->uri->segment(3);

         $this->load->view('admin/header', $data);
         $this->load->view('admin/submodal', $data);
         $this->load->view('admin/footer', $data);
 	}	

}