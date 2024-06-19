module.exports = (sequelize, DataTypes) => {
    const PaymentDetails = sequelize.define('PaymentDetails', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Orders', 
                key: 'id',
            }
        },
        paymentMethod: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        paymentStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Pending', 
        },
        paymentDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        amountPaid: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        transactionReference: {
            type: DataTypes.STRING,
            allowNull: true, 
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'USD',
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW,
        }
    }, {
        tableName: 'PaymentDetails',
        timestamps: true,
    });

    return PaymentDetails;
};
