import React from "react";
import { bindActionCreators } from "redux";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { connect } from "react-redux";

import { countResultsAction } from "actions/countResultsAction";
import PokemonItem from "components/PokemonItem";
import PokemonDetailItem from "components/PokemonDetailItem";

const GET_ALL_POKEMON = gql`
  query GetAllPokemon(
    $sortMethod: PokemonOrderByInput
    $selectedFilters: [Type!]
    $searchString: String
  ) {
    allPokemon(
      orderBy: $sortMethod
      filterByType: $selectedFilters
      searchString: $searchString
    ) {
      id
      name
      img
      stars
      types
      number
    }
  }
`;

const GET_POKEMON_DETAILS = gql`
  query GetPokemonDetails($name: String!) {
    pokemon(name: $name) {
      attack
      defense
      HP
      sp_atk
      sp_def
      speed
    }
  }
`;

const Pokemon = ({
  sortMethod,
  selectedFilters,
  searchString,
  showDetails,
  countResultsAction
}) => {
  const sortingMethods = {
    alphabetical: "name_ASC",
    reversealphabetical: "name_DESC",
    popularity: "stars_DESC",
    pokemonnumber: "number_ASC"
  };

  var filterTypes = Object.keys(selectedFilters).filter(function(key) {
    if (key !== "sort" && key !== "search" && selectedFilters[key] === true) {
      return key;
    }
  });

  return (
    <Query
      query={GET_ALL_POKEMON}
      variables={{
        sortMethod: sortingMethods[sortMethod],
        selectedFilters: filterTypes,
        searchString: searchString
      }}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;

        if (error) return <p>Error :(</p>;

        countResultsAction(data.allPokemon);

        return data.allPokemon.map(
          ({ name, types, stars, img, id, number }, i) => {
            if (!showDetails[name]) {
              return (
                <PokemonItem
                  id={id}
                  key={id}
                  src={img}
                  stars={stars}
                  hasStarred={false}
                  name={name}
                  types={types}
                  number={number}
                />
              );
            } else {
              return (
                <Query
                  key={id}
                  query={GET_POKEMON_DETAILS}
                  variables={{ name: name }}
                >
                  {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;

                    if (error) return <p>Error :( </p>;

                    const {
                      attack,
                      defense,
                      HP,
                      sp_atk,
                      sp_def,
                      speed
                    } = data.pokemon;

                    return (
                      <PokemonDetailItem
                        id={id}
                        key={id}
                        src={img}
                        stars={stars}
                        hasStarred={false}
                        name={name}
                        types={types}
                        attack={attack}
                        defense={defense}
                        HP={HP}
                        sp_atk={sp_atk}
                        sp_def={sp_def}
                        speed={speed}
                        number={number}
                      />
                    );
                  }}
                </Query>
              );
            }
          }
        );
      }}
    </Query>
  );
};

//--Redux--//
const mapStateToProps = state => {
  return {
    sortMethod: state.form.searchForm.values.sort,
    selectedFilters: state.form.searchForm.values,
    searchString: state.form.searchForm.values.search,
    showDetails: state.togglePokemonDetails
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ countResultsAction }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pokemon);
