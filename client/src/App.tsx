import { LoadingOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Input,
  List,
  Result,
  Row,
  Spin,
  Table,
  TableProps,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import apiClient from "./libs/client";
import { getHistoricalBalances } from "./libs/getHistoricalBalance";
import { getTokens } from "./libs/getTokens";
import { getWallets } from "./libs/getWallets";
import { BalanceType } from "./types/BalanceType";
import { HexString } from "./types/HexString";
import { ResponseData } from "./types/ResponseData";

const columns: TableProps<BalanceType>["columns"] = [
  {
    title: "Wallet Address",
    dataIndex: "wallet_address",
    key: "wallet_address",
  },
  {
    title: "Wallet token_address",
    dataIndex: "token_address",
    key: "token_address",
  },
  {
    title: "Balance",
    dataIndex: "token_balance",
    key: "token_balance",
  },
  {
    title: "USD",
    dataIndex: "token_value_usd",
    key: "token_value_usd",
  },
  {
    title: "Block number",
    dataIndex: "block_number",
    key: "block_number",
  },
  {
    title: "Timestamp",
    dataIndex: "timestamp",
    key: "timestamp",
  },
];

const endpoints = [
  "/wallets",
  "/wallets/:wallet_address/historical_balances/",
  "/wallets/:wallet_address/token/:token_address/historical_balances/",
  "/wallets/:wallet_address/token/:token_address/balance/",
  "/wallets/:wallet_address/token/:token_address/price/",
];

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const [wallets, setWallets] = useState<HexString[]>([]);
  const [tokens, setTokens] = useState<HexString[]>([]);
  const [balances, setBalances] = useState<BalanceType[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<HexString | null>(null);
  const [selectedToken, setSelectedToken] = useState<HexString | null>(null);

  const [response, setResponse] = useState<ResponseData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [_wallets, _tokens] = await Promise.all([
          getWallets(),
          getTokens(),
        ]);
        setWallets(_wallets);
        setTokens(_tokens);
        setLoading(false);
      } catch (error) {
        setError(error as unknown as Error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchBalances = async () => {
      if (!selectedWallet) {
        return;
      }
      const data = await getHistoricalBalances(selectedWallet);
      setBalances(data);
    };

    fetchBalances();
  }, [selectedWallet, selectedToken]);

  const handleFetchData = async (fetchFunction: () => Promise<HexString[]>) => {
    try {
      setLoading(true);
      const data = await fetchFunction();
      if (fetchFunction.name === "getWallets") {
        setWallets(data);
      } else {
        setTokens(data);
      }
      setLoading(false);
      setError(null);
    } catch (error) {
      setError(error as unknown as Error);
      setLoading(false);
    }
  };

  const handleFetch = async (endpoint: string) => {
    let _endpoint = endpoint;
    _endpoint = _endpoint.replace(":wallet_address", selectedWallet || "");
    _endpoint = _endpoint.replace(":token_address", selectedToken || "");
    const res = await apiClient.get<ResponseData>(_endpoint);
    setResponse(res.data);
  };

  if (loading) {
    return (
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    );
  }

  if (error) {
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Button type="primary" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        }
      />
    );
  }

  return (
    <main className="App">
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div>
            <Divider orientation="left">Wallet address list:</Divider>
            <List
              size="small"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 3,
              }}
              header={
                <Flex
                  align="center"
                  justify="space-between"
                  style={{ width: "100%" }}
                >
                  <Typography.Text
                    style={{ color: "#1677ff", fontWeight: "bold" }}
                  >
                    Selected: {selectedWallet}
                  </Typography.Text>
                  <Button
                    type="primary"
                    onClick={() => handleFetchData(getWallets)}
                  >
                    Refetch
                  </Button>
                </Flex>
              }
              bordered
              dataSource={wallets}
              renderItem={(item) => (
                <List.Item>
                  <Flex
                    align="center"
                    justify="space-between"
                    style={{ width: "100%" }}
                  >
                    <Typography.Text>{item}</Typography.Text>
                    <Button onClick={() => setSelectedWallet(item)}>
                      Select
                    </Button>
                  </Flex>
                </List.Item>
              )}
            />
          </div>
        </Col>
        <Col span={12}>
          <div>
            <Divider orientation="left">Token address list:</Divider>
            <List
              size="small"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 3,
              }}
              header={
                <Flex
                  align="center"
                  justify="space-between"
                  style={{ width: "100%" }}
                >
                  <Typography.Text
                    style={{ color: "#1677ff", fontWeight: "bold" }}
                  >
                    Selected: {selectedToken}
                  </Typography.Text>
                  <Button
                    type="primary"
                    onClick={() => handleFetchData(getTokens)}
                  >
                    Refetch
                  </Button>
                </Flex>
              }
              bordered
              dataSource={tokens}
              renderItem={(item) => (
                <List.Item>
                  <Flex
                    align="center"
                    justify="space-between"
                    style={{ width: "100%" }}
                  >
                    <Typography.Text>{item}</Typography.Text>
                    <Button onClick={() => setSelectedToken(item)}>
                      Select
                    </Button>
                  </Flex>
                </List.Item>
              )}
            />
          </div>
        </Col>
        <Col span={24}>
          <Typography.Title level={3} style={{ color: "#1677ff" }}>
            Historical Balances
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Table size="middle" columns={columns} dataSource={balances} />
        </Col>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card>
                {endpoints.map((endpoint) => (
                  <Flex
                    align="center"
                    justify="space-between"
                    style={{ width: "100%", marginBottom: "16px" }}
                  >
                    <Typography.Text>{endpoint}</Typography.Text>
                    <Button onClick={() => handleFetch(endpoint)}>GET</Button>
                  </Flex>
                ))}
              </Card>
            </Col>
            <Col span={12}>
              <Input.TextArea
                readOnly
                value={JSON.stringify(response)}
                style={{ height: "100%" }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </main>
  );
};

export default App;
