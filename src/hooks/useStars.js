import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GetStars } from './query.graphql';

export default function useStars() {
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [repo, setRepo] = useState(null);
  const [data, setData] = useState(undefined);
  const [loadStars, { called, data: pageData, variables, error }] = useLazyQuery(GetStars);

  useEffect(() => {
    if (pageData) {
      setLoading(true);
      const { stargazers } = pageData.repository;
      const { edges, totalCount } = stargazers;
      const { hasNextPage, endCursor } = stargazers.pageInfo;
      setData((oldData = {}) => {
        const tmpObj = {};
        edges.forEach(({ node, starredAt }) => {
          let dateObj = new Date(starredAt);
          let keyVal = `${dateObj.toLocaleDateString(navigator.language, {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
          })}`;
          // 考虑老数据可能有相同key
          tmpObj[keyVal] = tmpObj[keyVal]
            ? tmpObj[keyVal]
            : oldData[keyVal]
            ? oldData[keyVal]
            : null;
          if (tmpObj[keyVal]) {
            tmpObj[keyVal].count = tmpObj[keyVal].count + 1;
            tmpObj[keyVal].users = [...tmpObj[keyVal].users, { ...node, starredAt }];
          } else {
            tmpObj[keyVal] = { count: 1, users: [{ ...node, starredAt }] };
          }
        });
        return { ...oldData, ...tmpObj, total: totalCount };
      });

      if (hasNextPage) {
        loadStars({
          variables: {
            ...variables,
            after: endCursor
          }
        });
      } else {
        setLoading(false);
        setFinished(true);
      }
    } else if (called) {
      setLoading(true);
      setFinished(false);
    }
  }, [pageData, loadStars, called, variables]);
  const startLoadStars = ({ owner, name }) => {
    setData(undefined);
    setFinished(false);
    setRepo({ owner, name });
    loadStars({
      variables: {
        owner,
        name
      }
    });
  };

  return {
    startLoadStars,
    repo,
    data,
    loading: loading && !error,
    finished,
    error
  };
}
