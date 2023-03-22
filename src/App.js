import { useEffect, useState } from "react";
import "./styles.css";

const logError = (e) => {
  console.error(e);
};

export default function App() {
  // 1. get pokemon names
  const [pokemon, setPokemon] = useState(undefined);

  // 2. pokemon encounters
  const [encounters, setPokemonEncounters] = useState({});

  // 3. pagination
  const [pagination, setPagination] = useState({
    count: 0,
    currentPage: 0,
    nextPage: false,
    prevPage: false
  });
  const currentPageStart = pagination.currentPage * 10 + 1;

  // 1. get pokemon names
  useEffect(() => {
    // fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10`)
    // add pagination
    const offset = pagination.currentPage * 10;
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${offset}`)
      .then((res) => {
        res
          .json()
          .then((res) => {
            setPokemon(res.results);
            setPagination((prevPagination) => ({
              ...prevPagination,
              count: res.count
            }));
          })
          .catch((e) => logError(e));
      })
      .catch((err) => logError(err));
  }, [pagination.currentPage]);

  // 2. get encounters
  useEffect(() => {
    if (pokemon) {
      pokemon.forEach(async (p) => {
        try {
          const _encountersRes = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${p.name}/encounters`
          );
          const _encountersData = await _encountersRes.json();
          setPokemonEncounters((prevEncounters) => {
            return {
              ...prevEncounters,
              [p.name]: _encountersData
                .map((_encounter) => _encounter["location_area"].name)
                .slice(-1)
            };
          });
        } catch (e) {
          logError(e);
        }
      });
    }
  }, [pokemon]);

  // 3. handle pagination
  const onNextClick = () => {
    setPagination((prevPagination) => ({
      ...pagination,
      currentPage: prevPagination.currentPage + 1
    }));
  };

  const onPrevClick = () => {
    setPagination((prevPagination) => ({
      ...pagination,
      currentPage: prevPagination.currentPage - 1
    }));
  };

  console.info("Encounters: ", encounters);
  return (
    <div className="App">
      <h1>Pokemon Encounters</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Pokemon name</th>
              <th>Most recent encounter</th>
            </tr>
          </thead>
          <tbody>
            {pokemon?.map((p) => {
              console.log(encounters[p.name]);
              return (
                <tr>
                  <td>{p.name}</td>
                  {encounters[p.name] && encounters[p.name].length > 0 ? (
                    <td>{encounters[p.name]}</td>
                  ) : (
                    <td>No encounters</td>
                  )}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            {`Results: ${currentPageStart}-${currentPageStart + 9} / ${
              pagination.count
            } `}
            <button onClick={onPrevClick} disabled={currentPageStart <= 1}>
              Previous
            </button>
            <button
              onClick={onNextClick}
              disabled={currentPageStart + 9 > pagination.count}
            >
              Next
            </button>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
