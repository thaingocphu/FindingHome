<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Post_model extends CI_Model {
	public function __construct(){
		parent::__construct();
	}
	public function insert_new_post($data){
		
		$data_Post['userId'] = $data['userId'];
		$data_Post['address'] = $this->encryption->encrypt($data['address']);
		$data_Post['typeRoom'] = $data['typeRoom'];
		$data_Post['price'] = $data['price'];
		$data_Post['title'] = $data['title'];
		$data_Post['area'] = $data['area'];
		$data_Post['zalo'] = $this->encryption->encrypt($data['zalo']);
		$data_Post['furniture'] = $data['furniture'];
		$data_Post['description'] = $data['description'];
		$data_Post['otherFee'] = $data['otherFee'];
		$data_Post['rule'] = $data['rule'];
		$data_Post['nearby'] = $data['nearby'];
		$data_Post['urlImages'] = $this->encryption->encrypt($data['urlImages']);

		$this->db->insert('posts', $data_Post);
		$post_id = $this->db->insert_id();

		if(!empty($post_id)){
			$data_statusPost['postId'] = $post_id;
			$data_statusPost['dateCreateAt'] = $data['dateCreateAt'];
			$data_statusPost['dateExpired'] = $data['dateExpired'];
			$data_statusPost['status'] = $data['status'];
			$data_statusPost['check'] = $data['check'];

			 $query =$this->db->insert('statusPost', $data_statusPost);

			 if(!empty($query)){
				return true;
			 }else{
				return false;
			 }
		}else{
			return false;
		}

	}
	
	public function get_all_post(){
		$this->db->select('users.name as name, users.phone as phone, posts.*, statusPost.dateCreateAt as dateCreateAt, statusPost.dateExpired as dateExpired, statusPost.status as status, statusPost.check as check');
		$this->db->from('posts');
		$this->db->join('users','posts.userId = users.id');
		$this->db->join('statusPost', 'posts.id = statusPost.postId');
		$query =  $this->db->get();

		if(!empty($query)){
			return $query->result();
		}else{
			return false;
		}
		
	}
}