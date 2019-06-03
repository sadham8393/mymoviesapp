import React, {Component} from 'react';
import { INPUT_TYPE_TEXT } from '../utils/constants';
import { deleteMovieMessage } from '../utils/utils';
import { connect } from 'react-redux';
import SearchField from './SearchField';
import Header from './Nav';
import Pagination from './Common/Pagination';
import MovieList from './Movies/MovieList';
import MovieInfoModal from './Movies/MovieInfoModal';
import * as actions from '../actions/moviesAction';
import Alert from './Common/Alert';
import Loader from './Common/Loader';
import ConfirmModal from './Common/ConfirmModal';

class Home extends Component {
    constructor(){
        super();
        this.state = {
          initialLoading : true,
          moviesList :{},
          movies : [],
          searchterm : "",
          tvMovieType : "movie",
          searchBtnDisabled : true,
          currentPage : 1,
          pageCount : 0,
          totalCount :0,
          fieldValid : true,
          message : "",
          alertClass : "hide",
          isLoading : false,
          infoModalOpen : false,
          currentMovie : null,
          confirmModalOpen : false,
          movieId : "", 
          movieName : ""
        }
    }

    componentDidMount(){
      this.props.getTrendingList(1);
    }
    componentDidUpdate(){
      window.scrollTo(0, 0);
    }

    static getDerivedStateFromProps(nextProps, prevState){
      let moviesList = nextProps.moviesList,
          infoMessage = nextProps.info,
          errorMessage = nextProps.error,
          successMessage = nextProps.success,
          isLoading = nextProps.isLoading;
      if(isLoading){
        return {
          isLoading : isLoading
        };
      }
      if(infoMessage){
        return {
          moviesList : {},
          movies : [], 
          pageCount : 0,
          currentPage : 1, 
          totalCount : 0,
          message : infoMessage, alertClass : "show info", isLoading : false
        }
      } 
      if(errorMessage) {
        return {
          moviesList : {},
          movies : [], 
          pageCount : 0,
          currentPage : 1, 
          totalCount : 0,
          message : errorMessage, alertClass : "show error", isLoading : false
        }
      }

      if(moviesList && moviesList.results.length >= 0) {
        return {
          moviesList : moviesList,
          movies : [...moviesList.results], 
          pageCount : moviesList.total_pages,
          currentPage : moviesList.page, 
          totalCount : moviesList.total_results,
          isLoading : false,
          message : successMessage ? successMessage : "" , 
          alertClass : successMessage ? "show success" : "hide"
        };
      }
      
      return prevState;
    }

    handleSearch = (e) => {
      this.closeAlert();
      e.preventDefault();
      let { tvMovieType, searchterm } = this.state;
      if(!searchterm){
        this.setState({ fieldValid : false});
      }
      this.setState({ initialLoading:false});
      this.props.getMoviesList({tvMovieType, searchterm, pageNumber : 1 });
    }

    nextPage = (pageNumber) => {
      this.closeAlert();
      let {tvMovieType, searchterm } = this.state;
      if(this.state.initialLoading){
        this.props.getTrendingList(pageNumber);
      } else {
        this.props.getMoviesList({tvMovieType, searchterm, pageNumber });
      } 
    }

    handleChange = (e, fieldType) => {
      this.closeAlert();
      let input = e.target.value;
      if(INPUT_TYPE_TEXT === fieldType && input ){
        this.setState({ searchBtnDisabled : false});
      } else if(INPUT_TYPE_TEXT === fieldType && !input) {
        this.setState({ searchBtnDisabled : true});
      }
      this.setState({[e.target.name] : input ? input : "" , currentPage : 1});
    }

    headerClick = () => {
      this.closeAlert();
      this.setState(prevState => ({
        initialLoading: !prevState.initialLoading
      }));
      this.props.resetResponse();
      this.props.getTrendingList(1);
    }

    renderPagination = (totalPages) => {
      if(totalPages > 1){
        return (
          <Pagination totalCount = {this.state.totalCount} pages = {totalPages} nextPage = {this.nextPage} currentPage = {this.state.currentPage}/>
        )
      }
    }
    
    closeAlert = () => {
      this.props.resetResponse();
      this.setState({alertClass : "hide"})
    }

    renderLoader = () => {
      if(this.state.isLoading){
        return (
          <Loader />
        )
      }
    }

    renderInfoModal = () => {
      if(this.state.infoModalOpen){
          return (
            <MovieInfoModal movie = {this.state.currentMovie} viewInfoModalOpen = {this.state.infoModalOpen} closeInfoModal={this.closeInfoModal}/>
          )
      }
    }
    renderConfirmModal = () =>{
      if(this.state.confirmModalOpen){
          return (
            <ConfirmModal confirmModalOpen = {this.state.confirmModalOpen} confirmMessage = {deleteMovieMessage(this.state.movieName)} 
            title = {`Delete ${this.state.movieName}`} onYesClick = {this.confirmYesClick} onNoClick = {this.confirmNoClick}/>
          )
      }
    }

    confirmYesClick = () => {
      let moviesList = this.state.moviesList,
          movieId = this.state.movieId;
          this.props.deleteTvMovie(movieId, moviesList);
      this.setState(prevState => ({
        confirmModalOpen: !prevState.confirmModalOpen, movieId : "", movieName : ""
      }));
    }

    confirmNoClick = () => {
      this.setState(prevState => ({
        confirmModalOpen: !prevState.confirmModalOpen, movieId : "", movieName : ""
      }));
    }

    onDeleteClick = (movie) => {
      let movieId = movie.id,
          movieName = movie.name || movie.title;
      this.setState(prevState => ({
        confirmModalOpen: !prevState.confirmModalOpen, movieId : movieId, movieName : movieName
      }));
    }

    viewInfoModal = (currentMovieDetails) => {
        this.setState({
          infoModalOpen: true, currentMovie : currentMovieDetails
        });
    }

    closeInfoModal = () => {
      this.setState({
        infoModalOpen: false, currentMovie : null
      });
    }

    render() {
      let totalPages = this.state.pageCount,
          alertMessage = this.state.message;
      return (
        <div className = "home-container">
            {this.renderLoader()}
            {this.renderInfoModal()}
            {this.renderConfirmModal()}
            <Header onHeaderClick = {this.headerClick}/>
            <Alert alertClass = {this.state.alertClass} alertClose = {this.closeAlert} alertMessage = {alertMessage}/>
            <SearchField handleSearch = {this.handleSearch} handleChange = {this.handleChange} 
                          searchBtnDisabled = {this.state.searchBtnDisabled} fieldValid = {this.state.fieldValid}/>
            {this.renderPagination(totalPages)}
            <MovieList movies = {this.state.movies} viewInfoModal = {this.viewInfoModal} onDeleteClick = {this.onDeleteClick}/>
            {this.renderPagination(totalPages)}
            
        </div>
      );
    }
}

const mapStateToProps = (state) => ({
  moviesList : state.movies.moviesList,
  info : state.movies.info,
  error : state.movies.error,
  success : state.movies.success,
  isLoading : state.movies.isLoading
})

export default connect(mapStateToProps,actions)(Home);