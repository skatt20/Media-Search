<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ci_search_media extends MY_Controller {
	public function index(){
		$this->load_page('ci_search_media');
	}
	
	public function search_pixabay() {
        $query = $this->input->get('query');
        $type = $this->input->get('type'); // 'video' or 'image'
        
        if (!$query) {
            $data = ['status' => 400, 'message' => 'Query parameter is required'];
            json($data);
            return;
        }
        
        $apiKey = '44956824-171f2932fe1c34d9695051b0c';
        $url = "https://pixabay.com/api/?key=$apiKey&q=" . urlencode($query);
        
        if ($type == 'video') {
            $url = "https://pixabay.com/api/videos/?key=$apiKey&q=" . urlencode($query);
        }
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $response = curl_exec($ch);
        curl_close($ch);
        
        if ($response === false) {
            $data = ['status' => 500, 'message' => 'Error fetching data from Pixabay API'];
            json($data);
            return;
        }
        
        header('Content-Type: application/json');
        echo $response;
    }
    
} 
?>