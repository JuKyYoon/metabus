const executeQuery = async (pool, querystring) => {
    var connection = await pool.getConnection(async (conn) => conn);
    var result;

    try {
        await connection.beginTransaction();
        result = await connection.query(querystring);
        await connection.commit();
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
    return result;
};
export default executeQuery;
